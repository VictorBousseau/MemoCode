import pandas as pd
import numpy as np

# 1. Mock Data
dates = pd.date_range(start='2023-01-01', periods=20, freq='D')
df = pd.DataFrame({'date': dates, 'sales': np.arange(20)})

# 2. Feature Engineering Logic

# 2.1 Cyclical Encoding (Month & DayOfWeek)
# We map the cycle to a circle (0 to 2pi)
def encode_cyclical(df, col, max_val):
    df[col + '_sin'] = np.sin(2 * np.pi * df[col] / max_val)
    df[col + '_cos'] = np.cos(2 * np.pi * df[col] / max_val)
    return df

df['month'] = df['date'].dt.month
df['day_of_week'] = df['date'].dt.dayofweek

# Month: 1-12 (max 12)
df = encode_cyclical(df, 'month', 12)
# Day of week: 0-6 (max 6, or 7 for period?) 
# Standard is usually 7 (0=Monday, 6=Sunday -> 7 days cycle)
df = encode_cyclical(df, 'day_of_week', 7)

# 2.2 Lags
df['sales_lag_1'] = df['sales'].shift(1)

# 2.3 Rolling Windows
df['sales_roll_mean_3'] = df['sales'].rolling(window=3).mean()

# 2.4 Time Deltas
ref_date = pd.Timestamp('2023-01-01')
df['days_since_start'] = (df['date'] - ref_date).dt.days

# 3. Verification

print("--- DataFrame Head ---")
print(df.head())

# Check Cyclical
# Jan 1st (Month 1) vs Dec (Month 12) should be close in Cosine
# sin(2pi * 1/12) vs sin(2pi * 12/12) -> sin(pi/6)=0.5 vs sin(2pi)=0
# cos(2pi * 1/12) vs cos(2pi * 12/12) -> cos(pi/6)=0.866 vs cos(2pi)=1
# They are somewhat close. 
# Let's check ranges
assert df['month_sin'].min() >= -1.0 and df['month_sin'].max() <= 1.0
assert df['month_cos'].min() >= -1.0 and df['month_cos'].max() <= 1.0

# Check Lags
assert pd.isna(df.loc[0, 'sales_lag_1'])
assert df.loc[1, 'sales_lag_1'] == df.loc[0, 'sales']

# Check Rolling
# Index 2 (3rd row) should be mean of 0, 1, 2 -> (0+1+2)/3 = 1.0
assert df.loc[2, 'sales_roll_mean_3'] == 1.0

# Check Time Delta
assert df.loc[0, 'days_since_start'] == 0
assert df.loc[10, 'days_since_start'] == 10

print("\n✅ Verification Passed!")
