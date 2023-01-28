init: init-project clone-submodule clone-and-create-public
	@echo "init done\n"

server:
	npm run server

deploy: clear-build clone-and-create-public
	@echo "Start deploy..."
	npm run deploy
	@echo "done\n"

init-project:
	@echo "Start npm install..."
	npm install
	@echo "done\n"

clone-submodule:
	@echo "Start clone and update submodule..."
	git submodule update --init --recursive
	@echo "done\n"

clear-build:
	npm run clean

clone-and-create-public:
	@echo "Start clone master into public folder..."
	git clone --branch master git@github.com:bython24680/bython24680.github.io.git public
	cd ./public; \
		rm -rf .git
	@echo "done\n"
