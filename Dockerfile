  
#Maintainer <Irving Sanchez> 
# Lo iniciamos con la imagen official de Node 14.3.0-alpine
FROM node:14.3.0-alpine
# Vamos a crear un directorio donde hospedar la aplicación Angular
RUN mkdir -p /usr/front
# Nos cambiamos a ese directorio 
WORKDIR /usr/front
# Copiamos el paquete json para gestionar las dependencias
COPY package.json /usr/front
# Instalamos esas depndencias
RUN npm install
#instalamos angular
RUN npm i -g @angular/cli
# Copiamos el código que hemos generado en el punto anterior, al crear la aplicación angular-cli
COPY . /usr/front
# Exponemos el Puerto
EXPOSE 4200
# Arrancamos
#CMD ["ng", "serve"]
CMD ng serve --host 0.0.0.0
