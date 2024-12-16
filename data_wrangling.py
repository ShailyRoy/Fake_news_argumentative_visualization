import pandas as pd


fake_data = pd.read_csv('data/fake.csv')
true_data = pd.read_csv('data/true.csv')


fake_data['source'] = 'fake'
true_data['source'] = 'true'


combined_data = pd.concat([fake_data, true_data], ignore_index=True)


combined_data.to_csv('data/combined_news.csv', index=False)

print("Datasets combined successfully and saved as 'combined_news.csv'.")
