VOLUME_PATH=/home/${USER}/trascendence_volumes

RED="\033[0;31m"
GREEN="\033[0;32m"
MAGENTA="\033[0;35m"
PINK="\033[0;95m"
CYAN="\033[0;36m"
YELLOW="\033[0;33m"
NC="\033[0m"


all: create_volumes
	docker compose -f srcs/docker-compose.yml up --build -d
	docker compose -f srcs/docker-compose.yml start

stop:
	docker compose -f srcs/docker-compose.yml stop

down:
	docker compose -f srcs/docker-compose.yml down

restart:
	docker compose -f srcs/docker-compose.yml restart

logs:
	docker compose -f srcs/docker-compose.yml logs

up-%:
	docker compose -f srcs/docker-compose.yml up $* -d

build-%:
	docker compose -f srcs/docker-compose.yml build $* 

create_volumes:
	echo $(GREEN)"Creating volumes... 🗃️"$(NC)
	mkdir -p $(VOLUME_PATH)

clean:
	@echo $(RED)"Deleting Volumes... 🧹"$(NC)
	docker compose -f srcs/docker-compose.yml down
	sudo rm -rf $(VOLUME_PATH)

.PHONY: all down stop restart logs up-% build-%