# nest-krama-watson

## Descripción

Paquete para utilizar los servicios de IBM Watson en Nest.JS

## Instalación

```bash

$ npm install --save nest-krama-watson

```

## Uso

Para definir las credenciales del servicio se puede o bien pasar como parámetro un objeto Options (por ejemplo AssistantV1.Options) o definirlo en el directorio raíz en el archivo watson.config.json

```bash

{
    "assistant": {
        "version": "version",
        "username": "username",
        "password": "password",
        "url": "url"
    }
}

```

Para empezar a utilizar los servicios de Watson, importar el módulo que se vaya a utilizar. 

```bash

@Module({
    imports: [
        WatsonAssistantModule.forRoot(),
    ],
})

```

Inyectar la dependencia en el servicio que lo necesite.

```bash

constructor(private watsonAssistant: WatsonAssistant)

```
