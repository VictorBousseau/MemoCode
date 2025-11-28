export const pythonContent = {
    categories: [
        {
            id: 'pandas',
            title: 'Pandas',
            description: 'Data manipulation and analysis',
            snippets: [
                {
                    id: 'load_data',
                    title: 'Loading Data',
                    description: 'Reading files from different paths.',
                    code: `import pandas as pd

# Relative path
df = pd.read_csv('data.csv')

# From a specific data folder
df_data = pd.read_excel('./data/données.xlsx')`
                },
                {
                    id: 'filtering',
                    title: 'Filtering Data',
                    description: 'Using .query() with simple and complex conditions.',
                    code: `# Simple filtering
filtered_df = df.query('column_name > 50')

# Complex conditions (AND / OR)
# Note: Use backticks for column names with spaces
complex_filter = df.query('age > 25 and (department == "Sales" or salary > 50000)')`
                },
                {
                    id: 'columns',
                    title: 'Column Management',
                    description: 'Selecting and dropping columns.',
                    code: `# Select specific columns
subset = df[['name', 'age', 'salary']]

# Drop columns
# axis=1 denotes columns
df_dropped = df.drop(columns=['unnecessary_col'], axis=1)`
                },
                {
                    id: 'dtypes',
                    title: 'Data Types',
                    description: 'Converting data types.',
                    code: `# Convert to specific types
df['age'] = df['age'].astype(int)
df['salary'] = df['salary'].astype(float)
df['is_active'] = df['is_active'].astype(bool)
df['category'] = df['category'].astype('category')

# Convert to datetime
df['date'] = pd.to_datetime(df['date'])`
                },
                {
                    id: 'missing_values',
                    title: 'Missing Values',
                    description: 'Handling NaN values.',
                    code: `# Drop rows with missing values
df_clean = df.dropna()

# Fill missing values
df_filled = df.fillna({
    'score': 0,
    'category': 'Unknown'
})`
                },
                {
                    id: 'aggregation',
                    title: 'Aggregation',
                    description: 'Groupby and Pivot Tables.',
                    code: `# GroupBy
avg_salary = df.groupby('department')['salary'].mean()

# Pivot Table
pivot = df.pivot_table(
    values='sales',
    index='date',
    columns='region',
    aggfunc='sum'
)`
                },
                {
                    id: 'joins',
                    title: 'Joins',
                    description: 'Merging and Joining DataFrames.',
                    code: `# Merge (SQL-style join)
merged_df = pd.merge(df1, df2, on='key_column', how='inner')

# Join (Index-based join)
joined_df = df1.join(df2, lsuffix='_left', rsuffix='_right')`
                },
                {
                    id: 'export',
                    title: 'Exporting Data',
                    description: 'Saving DataFrames to files.',
                    code: `# Export to CSV (without index)
df.to_csv('output.csv', index=False)

# Export to Excel
df.to_excel('output.xlsx', sheet_name='Sheet1', index=False)`
                }
            ]
        },
        {
            id: 'visualization',
            title: 'Visualization',
            description: 'Plotting with Matplotlib and Seaborn',
            snippets: [
                {
                    id: 'simple_plot',
                    title: 'Line Plot',
                    description: 'Basic line plot using Matplotlib.',
                    code: `import matplotlib.pyplot as plt

plt.plot([1, 2, 3, 4], [1, 4, 9, 16])
plt.title('Simple Plot')
plt.show()`
                }
            ]
        },
        {
            id: 'ml',
            title: 'Machine Learning',
            description: 'Scikit-learn basics',
            snippets: [
                {
                    id: 'train_test_split',
                    title: 'Train Test Split',
                    description: 'Split data into training and testing sets.',
                    code: `from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)`
                }
            ]
        }
    ]
};
