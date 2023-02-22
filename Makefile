# TAG = $(shell git describe --abbrev=0 --tags)
TAG = v1.0.0
IMAGE_TAG = $(TAG:v%=%)
SERVER_IMAGE = hojas/nest-react-blog-server
WEB_IMAGE = hojas/nest-react-blog-web
ADMIN_IMAGE = hojas/nest-react-blog-admin

server:
	docker build -t $(SERVER_IMAGE):latest -t $(SERVER_IMAGE):$(IMAGE_TAG) -f docker/server.Dockerfile .
	docker image prune -f

web:
	docker build -t $(WEB_IMAGE):latest -t $(WEB_IMAGE):$(IMAGE_TAG) -f docker/web.Dockerfile .
	docker image prune -f

admin:
	docker build -t $(ADMIN_IMAGE):latest -t $(ADMIN_IMAGE):$(IMAGE_TAG) -f docker/admin.Dockerfile .
	docker image prune -f

push-server:
	docker push $(SERVER_IMAGE):$(IMAGE_TAG)
	docker push $(SERVER_IMAGE):latest

push-web:
	docker push $(WEB_IMAGE):$(IMAGE_TAG)
	docker push $(WEB_IMAGE):latest

push-admin:
	docker push $(ADMIN_IMAGE):$(IMAGE_TAG)
	docker push $(ADMIN_IMAGE):latest
