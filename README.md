# productconfiguration-Pierobon-Cason
## Introduzione
Il progetto mirava alla costruzione di un sito web, in grado di presentare un prodotto. 
Il prodotto scelto è stato una scarpa da calcio, dove sono stati scelti 3 PBR diversi: plastica, metallo e tela, con ognuno due diffuse map diverse.
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
  - vertex / fragment -normalBackground: questo shader ha lo scopo di calcolare il colore della scarpa quando lo sfondo è quello bianco. Ci sono 3 luci di tipo 
  SpotLight, e una luce ambientale. Si è deciso di aggiungere tante luci per rendere l'oggetto più chiaro possibile. Si è calcolata una BRDF 
  per tutte e 3 le luci, successivamente esse verranno pesate con 0.5, in modo da non rendere l'oggetto troppo chiaro e quindi fastidioso alla vista. 
  La luce ambientale è stata aggiunta per rendere più chiara la parte sotto della scarpa, non creando quindi una zona scura.
  - vertex / fragment -reflection: questo shader viene utilizzato per i PBR di metallo e plastica, in quanto essendo molto lucidi riflettono l'ambiente, e quando
  l'environment map è lo stadio.
  Ovviamente il metallo rifletterà quasi completamente l'ambiente intorno, mentre la plastica quasi per nulla. Si è aggiunta pure una luce di tipo spotlight, 
  così da "simulare" la luce proveniente dal cielo e per aggiungere le caratteristiche del materiale, come i dislivelli creati dalla normal map.
  - vertex / fragment -noreflection: questo shader si utilizza quando il PBR è la tela e l'environment map è lo stadio. Infatti, essendo la tela un materiale
  che non riflette nulla dell'ambiente, si è deciso di far variare la luce dei vari frammenti con una irradiance map dello stadio 
  (calcolata grazie al software cmftStudio). E' stata aggiunta, come per la reflection, una luce di tipo spotlight. 
## FPS e Tone Mapping
Durante la scrittura del codice si è notato un lag della scena, questo dovuto a un non setting degli FPS. Ragion per cui si è optato per l'aggiunta di
una condizione nella funzione update, con lo scopo di dettare la frequenza di aggiornamento a 60 FPS.
Come indicazioni si è aggiunto un tone mapping di tipo ACESFilmicToneMapping, nel codice js. 
## Risultato finale

## Oggetto utilizzato e PRB
L'oggetto è stato scelto dal sito: https://sketchfab.com/.
I materiali PBR sono stati presi dai siti: https://3dtextures.me/ e https://freepbr.com/.
