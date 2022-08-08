import requests
from bs4 import BeautifulSoup
from pywebcopy import save_webpage


url = 'https://manybutfinite.com/archives'
base_url = 'https://manybutfinite.com'
reqs = requests.get(url)
soup = BeautifulSoup(reqs.text, 'html.parser')

urls = []
for link in soup.find_all('a'):
    if 'post/' in link.get('href'):
        full_url = base_url + link.get('href')
        urls.append(full_url)
        print(full_url)
        
        
print(f'Spotted {len(urls)} posts')

#pure text
#for url in urls:
#    r = requests.get(url, allow_redirects=True)
#    file_name = '/Users/andreipopovici/pg/test_download/' + url.split('/')[-2] + ".html"
#    print(file_name)
#    file = open(file_name, 'wb')
#    file.write(r.content)
#    file.close()
    

for url in urls:
    r = requests.get(url, allow_redirects=True)
    download_folder = '/Users/andreipopovici/pg/test_download/' + url.split('/')[-2]
    kwargs = {'bypass_robots': True, 'project_name': 'recognisable-name'}
    save_webpage(url, download_folder, **kwargs)