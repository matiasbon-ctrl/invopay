# InvopayLibrary

## Generar libreria
    ng generate library nombre-libreria
### Generar componente en libreria
    Los componentes son individuales los cuales luego son utilizados por las vista
    ng g c components/nombre-componente --project=nombre-libreria
### Genear una vista
    Los componentes de vista son los que se acceden a traves de la rutas
    ng g c views/nombre-componente --project=nombre-libreria

### Exportar componentes
    Los componente que se quiere exportar se agregan en el archivo public-api.ts.
### Generar la libreria
    El siguiente comando crea la libreria y la actualizacion en caso de cambios. 
        ng build nombre-libreria --watch
