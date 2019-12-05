#################################################
# Install Docker 
#################################################

If your OS is Window, use this link to install Docker: https://docs.docker.com/docker-for-windows/
If your OS is MAC, use this link to install Docker: https://docs.docker.com/docker-for-mac/install/

#################################################
Build a new image
#################################################

# Build a new image
docker build -f docker/Dockerfile -t <docker_name> .

# Run the image
docker run -t -p <your_port>:8080 <docker_name>

#################################################
The image was built and uploaded to Docker hub. 
You can pull the image and run in your local machine
#################################################
 
# Login Docker
docker login

# Pull the image
docker pull market-prediction

# Run the image
docker run -t -p <your_port>:8080 market-prediction



#################################################
Miscellanous
#################################################

docker images = docker image ls 
docker ps = docker container ls

#DEL All containers
docker rm $(docker ps -a -q)
#DEL All images
docker rmi $(docker images -q)

#Get Into pods
docker exec -it <container_name> sh

#Build
docker build . -f Dockerfile -t <container_name>

#Run
docker run <image_name> -p <expose_port>:80 
