export const pythonContent = {
    categories: [
        {
            id: 'pandas',
            title: 'Pandas',
            description: 'Data manipulation and analysis',
            snippets: [
                {
                    id: 'read_csv',
                    title: 'Read CSV',
                    description: 'Load data from a CSV file into a DataFrame.',
                    code: `import pandas as pd

df = pd.read_csv('data.csv')
print(df.head())`
                },
                {
                    id: 'group_by',
                    title: 'Group By',
                    description: 'Group data by a column and calculate mean.',
                    code: `df_grouped = df.groupby('category')['value'].mean()
print(df_grouped)`
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
