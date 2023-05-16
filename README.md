# Ventes-jeux-videos


## 1. Présentation

À travers cette visualisation, il est possible de visualiser la base de donnée choisie dans un graphique de type "Sunburst" avec une option Zoom. Dans le cadre de ce projet, la base de données représente le nombre de ventes, en millions d'unités, de jeux-vidéos en fonction de certaines consoles. 

Les fonctionnalités suivantes sont à disposition 
- Choix des consoles d'intérêt parmi 31 possibilités.
- Choix du genre (p. ex : RPG, stratégie, shooter ) parmi 12 valeurs présentes dans la base de données.

Ainsi, il est possible de voir quelle console a vendu le plus de jeux, quelle est la représentation des genres dans ce nombre et quels sont les jeux les plus vendus selon le genre et la console. Un deuxième graphique "Plotbar" est à disposition, celui-ci permet de visualiser spécifiquement un jeu présent dans la base de donnée, filtrée selon les choix précédents, afin de comparer les ventes de ce jeu parmi les différentes consoles. 

Voici trois exemples d'utilisation de cette visualisation : 

Premièrement, il est possible de comparer des consoles entre elles et leur popularité. On peut voir quels sont les genres les plus vendus par console, ainsi que les jeux ayant le plus contribué aux ventes. En explorant la base de données on peut voir que certains genres sont plus adaptés à certaines consoles, par exemple, les jeux de stratégie sont beaucoup plus consommés sur PC que sur les consoles de salon comme la PS3 ou la Xbox360. Il est également possible de comparer le nombre de ventes pour un même jeu entre des consoles concurrentes. 

Deuxièmement, en sélectionnant des jeux vidéos à parution annuelle comme la license Fifa (Sport) et des consoles d'une même entreprise  comme la PS3 et la PS4 de Sony, on peut visualiser la migration des consommateurs sur les nouvelles générations de consoles. On voit que d'une année à l'autre, le ratio Vente_PS4 / Vente_PS3 augmente. On voit l'obsolescence des anciennes consoles qui ne sont plus concernées par les jeux les plus récents. 
	

Troisièmement, le graphique fournit des informations financières quant aux ventes dans les régions suivantes : Japon, Amérique du Nord, Europe et autres (regroupant les autres régions). Ces informations peuvent être utilisées dans le cadre d'une analyse de marché afin de déterminer une stratégie marketing. En explorant les données, nous pouvons trouver des jeux-vidéos qui ne sont disponibles que dans une seule région, ces décisions peuvent être prises à travers une analyse de marché.

## 2. GIF

![Image](https://user-images.githubusercontent.com/82185439/238389650-78641df0-12b2-4285-926a-4f9ba3c6bb25.gif)
Réalisé avec [Canva](www.canva.com)

## 3. Librairies 

Ce projet se base sur la librairie Oberservable Plot construite à travers D3.

## 4. Origine des données :

- La [base de données](https://www.kaggle.com/datasets/rush4ratio/video-game-sales-with-ratings) utilisée a été importée via le site Kaggle (Owner Rush Kirubi).

- Celle-ci se base sur une base de donnée préexistante mise à disposition par [Gregory Smith](https://www.kaggle.com/gregorut/datasets).

Structure du code : 

- Le code ayant servi à la visualisation est un ["fork" du projet](https://observablehq.com/@d3/zoomable-sunburst) appartenant à Mike Bostock.

- ChatGPT a été utilisé pour coder une restructuration partielle de la structure de la base de données, afin de la faire correspondre à celle utilisée par Mike Bostock. Lors de la [discussion ChatGPT](https://chat.openai.com/c/64b87a5d-c7d0-41f6-ba89-49b312b02743) plusieurs questions sur des exemples de codage ont été posées, certaines ont été retenues, d'autres ont été complètement ignorées ou réadaptées afin de les corriger. 


## 5. Contexte

Ce projet a été développé par Celso Jorge Sebastiao, dans le cadre du Master DCS à l'UNIL pour le cours "Visualisation de données", dispensé par Isaac Pante (SLI, Lettres, UNIL).

## 6. Issues

Les dates sont limitées, il manque des données sur certains jeux importants, le nombre de ventes ne prend pas en compte le prix des jeux, le pouvoir d'achat entre les régions. La popularité d'une console n'est pas limitée aux jeux les plus vendus et cela ne permet pas d'inférer sur la qualité de celles-ci, ni de celle des jeux moins populaires. 
