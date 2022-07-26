TAG = $(shell git describe --abbrev=0 --tags)
IMAGE_TAG = $(TAG:v%=%)
SERVER_IMAGE = hojas/nx-blog-server
WEB_IMAGE = hojas/nx-blog-web
ADMIN_IMAGE = hojas/nx-blog-admin

web:
	docker build -t $(WEB_IMAGE):latest -t $(WEB_IMAGE):$(IMAGE_TAG) -f docker/Dockerfile.web .
	docker image prune -f
