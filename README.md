This is my own website/blog made using jekyll and hosted on github (for now!)

Since i cannot host it and don't want to spend money to host it somewhere else i'm limited to a static website but i will change that when i can 

to see the terminal version:
```bash
curl https://sebb57.github.io/hello.txt
```

to run locally:
```bash
sudo pacman -S gem git #arch
```
```bash
sudo apt install ruby-full build-essential zlib1g-dev git #debian/ubuntu
```
```bash
sudo dnf install ruby ruby-devel @development-tools git #fedora
```

```bash
git clone https://github.com/Sebb57/sebb57.github.io.git my-website && cd my-website

gem install jekyll bundle
bundle config set --local path 'vendor/bundle'
bundle install
bundle exec jekyll serve
```

