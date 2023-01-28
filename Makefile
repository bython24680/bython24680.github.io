init: init-project clone-submodule
	@echo "init done\n"

init-project:
	@echo "Start npm install..."
	npm install
	@echo "done\n"

clone-submodule:
	@echo "Start clone and update submodule..."
	git submodule update --init --recursive
	@echo "done\n"
