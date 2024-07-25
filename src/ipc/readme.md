# IPC

Este directorio contiene la implementación de un sistema de menú de Comunicación Entre Procesos (IPC). El sistema de IPC facilita la comunicación entre diferentes procesos, potencialmente ejecutándose en diferentes máquinas o entornos, a través de una interfaz de menú estructurada.

## Visión General

En general este archivo se encarga de manejar los eventos emitidos por electron.ipcRenderer.invoke o electron.ipcRenderer.send y aqui defines que se hace en caso de que estos eventos sean triggereados.
