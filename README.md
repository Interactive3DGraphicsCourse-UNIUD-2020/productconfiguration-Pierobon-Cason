# productconfiguration-Pierobon-Cason
## Introduzione
Il progetto mirava alla costruzione di un sito web, in grado di presentare un prodotto. 
Il prodotto scelto è stato una scarpa da calcio, dove sono stati scelti 3 PBR diversi, con ognuno due diffuse map diverse.
E' stata aggiunta inoltre la possibilità di scegliere tra due environment maps: una di sfondo bianco, dove la scarpa è più visile e chiara, e una di
sfondo stadio, dove è possibile vedere come sarà una volta che si scenderà in campo.
## PBR
Per implementare i materiali in maniera più reale possibile, si sono usate 3 mappe aggiuntive, 
oltre che alla mappa che detta la texture del materiale (diffuse map):
  - normal map: il suo scopo è quello di aggiungere un'illusione della superficie con un livello 
  geometrico che ha delle irregolarità visibili ma abbastanza piccole.
  - roughness map: una mappa in bianco e nero che permette il controllo della ruvidità di un materiale. 
  - specular map: texture in scala grigio, dove in bianco vengono dipinte le zone che sono più lucide ed in nero quelle opache.
## Shaders
Si è deciso di utilizzare 3 shaders, ognuno dei quali viene applicato in determinate circostanze:
 
