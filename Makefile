init:
	npm install
	npm run clean
	npm run build

clone-submodule:
	git submodule update --init --recursive
