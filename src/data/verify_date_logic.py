import pandas as pd
import holidays
from datetime import timedelta

def verify_logic():
    # Create sample data
    pd.set_option('display.max_columns', None)
    pd.set_option('display.width', 1000)
    dates = pd.date_range(start='2025-01-01', end='2025-12-31', freq='D')
    df = pd.DataFrame({'date': dates})

    # 1. Basic Date Features
    # Day name in French (requires locale setting or manual mapping for portability)
    # Using manual mapping to be safe across environments
    days_fr = {
        0: 'Lundi', 1: 'Mardi', 2: 'Mercredi', 3: 'Jeudi', 
        4: 'Vendredi', 5: 'Samedi', 6: 'Dimanche'
    }
    df['jour_nom'] = df['date'].dt.dayofweek.map(days_fr)
    
    # 2. French Public Holidays
    fr_holidays = holidays.France(years=[2025])
    df['jour_ferie'] = df['date'].apply(lambda x: x in fr_holidays)
    
    # 3. Day before holiday (Veille de jour férié)
    # Shift -1 (tomorrow is holiday -> today is veille)
    # But we need to be careful with shift on boolean.
    # If row i+1 is holiday, row i is veille.
    df['veille_jour_ferie'] = df['jour_ferie'].shift(-1).fillna(False)
    
    # 4. Day after holiday (Lendemain de jour férié)
    # If row i-1 is holiday, row i is lendemain.
    df['lendemain_jour_ferie'] = df['jour_ferie'].shift(1).fillna(False)
    
    # 5. Working Day (Jour Ouvré)
    # Mon-Fri (0-4) AND not holiday
    df['jour_ouvre'] = (df['date'].dt.dayofweek < 5) & (~df['jour_ferie'])
    
    # 6. Next Working Day after Holiday (Jour ouvré lendemain de jour férié)
    # "Si le jour férier est un vendredi le prochain jour ouvré est le lundi"
    # Logic: If yesterday was a holiday, AND today is a working day, then today is the "next working day" relative to that holiday.
    # But the user request says: "Si le jour férier est un vendredi le prochain jour ouvré est le lundi"
    # This implies we want to flag the day that IS the return to work.
    # So if Friday is holiday: Sat (weekend), Sun (weekend), Mon (Working). Mon is the return.
    # If Thursday is holiday: Fri (Working). Fri is the return.
    
    # Algorithm:
    # Iterate and find when the LAST holiday was.
    # If the previous day was a holiday, today is the return (if working).
    # If the previous day was NOT a holiday, but was a weekend that followed a holiday...
    
    # Simpler approach:
    # Identify blocks of "Non-Working Days" (Weekend OR Holiday).
    # The first Working Day after such a block is a "Return to Work".
    # BUT user specifically asked for "jour ouvré lendemain de jour férier".
    # Interpretation: The first working day following a sequence of (Holiday + potential Weekend).
    
    # Let's try to implement a robust "Next Working Day" finder.
    # We can use a custom function or shift logic.
    
    # Let's define "Holiday Sequence" as a contiguous block of days that are either Holiday or Weekend, 
    # BUT it must contain at least one Holiday.
    # Then the day after this block is the target.
    
    # Actually, simpler interpretation might be:
    # Is today a working day?
    # Was the immediate previous day a holiday? -> Yes.
    # Was the immediate previous day a weekend? -> Check day before.
    
    def is_return_from_holiday(idx, df):
        if not df.loc[idx, 'jour_ouvre']:
            return False
        
        # Look back
        prev_idx = idx - 1
        if prev_idx < 0:
            return False
            
        # If yesterday was holiday, then yes.
        if df.loc[prev_idx, 'jour_ferie']:
            return True
            
        # If yesterday was weekend, we need to keep looking back until we find a holiday OR a working day.
        # If we hit a working day first, then it wasn't a return from holiday.
        # If we hit a holiday first (with only weekends in between), then yes.
        
        while prev_idx >= 0:
            if df.loc[prev_idx, 'jour_ouvre']:
                return False # Found a working day before finding a holiday
            if df.loc[prev_idx, 'jour_ferie']:
                return True # Found a holiday with only non-working days in between
            prev_idx -= 1
            
        return False

    df['jour_ouvre_lendemain_ferie'] = [is_return_from_holiday(i, df) for i in range(len(df))]

    # Print sample to verify
    # Check around a known holiday: July 14th 2025 (Monday)
    print("--- Check July 14 (Monday) ---")
    print(df[(df['date'] >= '2025-07-11') & (df['date'] <= '2025-07-16')][['date', 'jour_nom', 'jour_ferie', 'jour_ouvre', 'jour_ouvre_lendemain_ferie']])

    # Check around August 15th 2025 (Friday)
    print("\n--- Check August 15 (Friday) ---")
    print(df[(df['date'] >= '2025-08-13') & (df['date'] <= '2025-08-19')][['date', 'jour_nom', 'jour_ferie', 'jour_ouvre', 'jour_ouvre_lendemain_ferie']])
    
    # Check around Christmas 2025 (Thursday)
    print("\n--- Check Dec 25 (Thursday) ---")
    print(df[(df['date'] >= '2025-12-23') & (df['date'] <= '2025-12-29')][['date', 'jour_nom', 'jour_ferie', 'jour_ouvre', 'jour_ouvre_lendemain_ferie']])

if __name__ == "__main__":
    verify_logic()
