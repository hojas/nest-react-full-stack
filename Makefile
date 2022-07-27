# TAG = $(shell git describe --abbrev=0 --tags)
TAG = v1.0.0
IMAGE_TAG = $(TAG:v%=%)
SERVER_IMAGE = hojas/nx-blog-server
WEB_IMAGE = hojas/nx-blog-web
ADMIN_IMAGE = hojas/nx-blog-admin

server:
	docker build -t $(SERVER_IMAGE):latest -t $(SERVER_IMAGE):$(IMAGE_TAG) -f docker/Dockerfile.server .
	docker image prune -f

web:
	docker build -t $(WEB_IMAGE):latest -t $(WEB_IMAGE):$(IMAGE_TAG) -f docker/Dockerfile.web .
	docker image prune -f

admin:
	docker build -t $(ADMIN_IMAGE):latest -t $(ADMIN_IMAGE):$(IMAGE_TAG) -f docker/Dockerfile.admin .
	docker image prune -f

push:
	docker push $(SERVER_IMAGE):$(IMAGE_TAG)
	docker push $(SERVER_IMAGE):latest
	docker push $(WEB_IMAGE):$(IMAGE_TAG)
	docker push $(WEB_IMAGE):latest
	docker push $(ADMIN_IMAGE):$(IMAGE_TAG)
	docker push $(ADMIN_IMAGE):latest
