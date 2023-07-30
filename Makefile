args = `arg="$(filter-out $(firstword $(MAKECMDGOALS)),$(MAKECMDGOALS))" && echo $${arg:-${1}}`

green  = $(shell printf "\e[32;01m$1\e[0m")
yellow = $(shell printf "\e[33;01m$1\e[0m")
red    = $(shell printf "\e[33;31m$1\e[0m")

format = $(shell printf "%-40s %s" "$(call green,make $1)" $2)

comma:= ,

.DEFAULT_GOAL:=help

%:
	@:

help:
	@echo ""
	@echo "$(call yellow,Use the following commands:)"
	@echo "$(call red,===============================)"
	@echo "$(call format,build_images,'Build')"
	@echo "$(call format,start,'Start')"
	@echo "$(call format,stop,'Stop')"


build_images: ## Build the custom base images #docker images | grep frontol
	docker build -t frontol_nginx:v0.1 -f docker/Dockerfile .
.PHONY: build_images

start: ## Start dev containers
	docker compose up -d
.PHONY: start 

stop: ## Stop dev containers
	docker compose stop
.PHONY: stop 

bash: ## Bash
	docker exec -it frontol_nginx bash
.PHONY: bash

#https://www.youtube.com/watch?v=gqseP_wTZsk
#docker tag frontol_nginx:v0.1 ghcr.io/developkosarev/frontol_nginx:v0.1
#docker images
#docker push ghcr.io/developkosarev/frontol_nginx:v0.1
#2.
#export CR_PAT=YOUR_TOKEN
#echo $CR_PAT | docker login ghcr.io -u developkosarev --password-stdin