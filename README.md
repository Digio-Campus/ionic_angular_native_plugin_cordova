Proyecto de ionic en angular para usar una función nativa android a través de un plugin local creado por nosotros. 
Este proyecto está hecho en Windows.



### PRE-REQUISITOS

Antes de comenzar, se mostrará un listado con las herramientas y versiones utilizadas:

- node 20.13.1
- cordova 12.0.0
- ionic 7.2.0


Necesitarás Android Studio con la variable de sistema ANDROID_HOME apuntando al SDK y tener en el path del sistema el bin del graddle para hacer un wrapper:

C:\Users\(tu usuario)\.gradle\wrapper\dists\gradle-8.7-bin\bhs2wmbdwecv87pi65oeuq5iu\gradle-8.7\bin

En mi caso cuando intenté crear el proyecto me pidió la 8.7

Además usaremos la herramienta de plugman para facilitar la creación de nuestro plugin.

```
npm install -g plugman
```





### CREAR PROYECTO IONIC

Como ionic no te permite crear un proyecto en react usando cordova lo crearemos con angular.

Creamos el proyecto desde el cmd.

 -	ionic start (name) (template) --type=angular --cordova


El comando que yo utilicé:

```
ionic start nativeFunc tabs --type=angular --cordova
```

Durante la instalación, te pedirá que eligas entre NgModules o Standalone. Elegimos Standalone porque es la recomendada.

Una vez creado, comprobamos que funcione correctamente. Dentro de la carpeta de nuestro proyecto ejecutamos:

```
ionic serve
```

Una vez funcione, conectamos el móvil físico y dentro de la carpeta de nuestro proyecto ejecutamos:

```
ionic cordova run android
```

Ejecutando este comando, cordova te instalará él los archivos necesarios antes de arrancarlo, por lo que no hace falta crear nosotros la carpeta android ni hacer un build.
Es importante tener el movil conectado para que la app lo detecte y pueda ejecutarse. 

De la misma manera, comprobamos que el proyecto arranco bien en nuestro dispositivo.





### CREAR PLUGIN LOCAL

Cordova recomienda crear los plugins en una carpeta diferente a la del proyecto principal.

Vamos a la ruta donde queramos generar una carpeta con nuestro plugin y ejecutamos:


 -	plugman create --name (nombre) --plugin_id (nombre del id del plugin) --plugin_version (version de tu plugin)


**IMPORTANTE:** Cordova recomienda que los id's de los plugins sigan el formato cordova-plugin-nombredelplugin pero he tenido muchos problemas con android para detectar la clase java que se genera por lo que lo mejor es poner la id todo junto y en minuscula sin ningún tipo de caracter especial.

El comando que yo utilicé:

```
plugman create --name miplugin --plugin_id idmiplugin --plugin_version 1.0.0
```

Nos situamos dentro de la carpeta de nuestro plugin y ejecutamos:

```
plugman platform add --platform_name android
```

Ahora tendremos un fichero .java dentro de la carpeta android generado y ahí tendremos un método llamado coolMethod. Ese método sera nuestra función nativa.

Para terminar, crearemos un package.json con el siguiente comando:

```
plugman createpackagejson .
```

el "." para que lo genere en el directorio actual, es decir, la ruta de instalación del package.

Recomiendo ejectuar el comando de esta forma. Podemos dejar por defecto todos los datos que nos pregunta.

Una vez creado el package, nuestro plugin ya está listo para ser instalado en el proyecto principal.


### INSTALAR Y USAR PLUGIN EN EL PROYECTO

Nos situamos en la carpeta del proyecto e instalamos el plugin:

 -	ionic cordova plugin add (ruta de la carpeta del plugin)

En mi caso:

```
ionic cordova plugin add ./miplugin
```

Una vez instalado, ya podremos ejecutarlo desde javascript.

En este repositorio, he dejado un proyecto con 2 funciones: El coolMethod (el cual es el por defecto) y una función que suma 2 numeros para porder visualizar un ejemplo de implementación de dos métodos en un mismo plugin.

Este proyecto tiene un botón que al presionarlo te devuelve un texto usando el coolMethod y la suma de 2 nuemros. Estos datos los paso directamente por js para no perder el tiempo.



Ficheros a tener en cuenta del proyecto:

-  tab1.page.ts	->	Lógica de js para usar los métodos.
-  tab1.page.html	->	Donde se sitúa el botón y se muestra los resultados.

Dentro de nuestro plugin:

-  .\miplugin\src\android\miplugin.java	->	Clase donde esta nuestros métodos nativos.
-  .\miplugin\www\miplugin.js	->	Es importante que haya tantos exports como métodos haya en el fichero de java. 
