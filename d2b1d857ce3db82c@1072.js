function _1(md){return(
md`# README
`
)}

function _2(md){return(
md`

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

`
)}

function _3(md){return(
md`# Zoomable Sunburst

This variant of a [sunburst diagram](/@d3/sunburst) shows only two layers of the hierarchy at a time. Click a node to zoom in, or the center to zoom out. Compare to an [icicle](/@d3/zoomable-icicle).`
)}

function _chart(partition,data,d3,width,color,arc,format,radius)
{
  const root = partition(data);

  root.each(d => d.current = d);

  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, width])
      .style("font", "10px sans-serif");

  const g = svg.append("g")
      .attr("transform", `translate(${width / 2},${width / 2})`);

  const path = g.append("g")
    .selectAll("path")
    .data(root.descendants().slice(1))
    .join("path")
      .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
      .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
      .attr("pointer-events", d => arcVisible(d.current) ? "auto" : "none")

      .attr("d", d => arc(d.current));

  path.filter(d => d.children)
      .style("cursor", "pointer")
      .on("click", clicked);

  path.append("title")
      .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);

  const label = g.append("g")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .style("user-select", "none")
    .selectAll("text")
    .data(root.descendants().slice(1))
    .join("text")
      .attr("dy", "0.35em")
      .attr("fill-opacity", d => +labelVisible(d.current))
      .attr("transform", d => labelTransform(d.current))
      .text(d => d.data.name);

  const parent = g.append("circle")
      .datum(root)
      .attr("r", radius)
      .attr("fill", "none")
      .attr("pointer-events", "all")
      .on("click", clicked);

  function clicked(event, p) {
    parent.datum(p.parent || root);

    root.each(d => d.target = {
      x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
      x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
      y0: Math.max(0, d.y0 - p.depth),
      y1: Math.max(0, d.y1 - p.depth)
    });

    const t = g.transition().duration(750);

    // Transition the data on all arcs, even the ones that aren’t visible,
    // so that if this transition is interrupted, entering arcs will start
    // the next transition from the desired position.
    path.transition(t)
        .tween("data", d => {
          const i = d3.interpolate(d.current, d.target);
          return t => d.current = i(t);
        })
      .filter(function(d) {
        return +this.getAttribute("fill-opacity") || arcVisible(d.target);
      })
        .attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
        .attr("pointer-events", d => arcVisible(d.target) ? "auto" : "none") 

        .attrTween("d", d => () => arc(d.current));

    label.filter(function(d) {
        return +this.getAttribute("fill-opacity") || labelVisible(d.target);
      }).transition(t)
        .attr("fill-opacity", d => +labelVisible(d.target))
        .attrTween("transform", d => () => labelTransform(d.current));
  }
  
  function arcVisible(d) {
    return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
  }

  function labelVisible(d) {
    return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
  }

  function labelTransform(d) {
    const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
    const y = (d.y0 + d.y1) / 2 * radius;
    return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
  }

  return svg.node();
}


function _data_raw(FileAttachment){return(
FileAttachment("version_json@5.json").json()
)}

function _6(data_raw){return(
data_raw.sort((a, b) => b.Global_Sales - a.Global_Sales)
)}

function _choice(Inputs){return(
Inputs.radio(["None", "Select"], {label: "Custom", value: "Select"})
)}

function _list_platform(data_raw){return(
[...new Set(data_raw.map(d => d.Platform))].sort()
)}

function _list_genre(data_raw){return(
[...new Set(data_raw.filter(game =>![""].includes(game.Genre))
                         .map(d => d.Genre).sort())]
)}

function _Selection_platform(choice,Inputs,list_platform,html){return(
(choice === "Select") ? 
   Inputs.checkbox(list_platform, {label: "Platform", value: ["PS4","XOne","PS3","X360","PC"]}) :
    html``
)}

function _Selection_genre(choice,Inputs,list_genre,html){return(
(choice === "Select") ? 
    Inputs.checkbox(list_genre, {label: "Genre", value:  ["Sports","Shooter","Role-Playing","Action"]}) :
    html``
)}

function _limit_games_per_genre(Inputs){return(
Inputs.range([1,30], {label: "Games Limit", step: 1, value:10})
)}

function _filtered_data(data_raw,Selection_platform,Selection_genre){return(
data_raw
                      .filter(game => Selection_platform.includes(game.Platform))
                     .filter(game => Selection_genre.includes(game.Genre))
)}

function _selected_game(Inputs,filtered_data){return(
Inputs.select([...new Set(filtered_data
                            .map(d => d.Name)),""].sort(), {label: "Select Game", value : ""})
)}

function _buildHierarchy(limit_games_per_genre){return(
function buildHierarchy(data) {
  let rootNode = {name: "Video Games", children: []};

  data.forEach(game => {
    let platformNode = rootNode.children.find(node => node.name === game.Platform);
    if (!platformNode) {
      platformNode = {name: game.Platform, children: []};
      rootNode.children.push(platformNode);
    }

    let genreNode = platformNode.children.find(node => node.name === game.Genre);
    if (!genreNode) {
      genreNode = {name: game.Genre, children: []};
      platformNode.children.push(genreNode);
    }
  /// cette première partie du code a été écrite avec l'aide de ChatGPT, la suite a été reprise en reprennant et comprennant cette première structure donnée. Le lien de la conversation ChatGPT se trouve dans la partie README.
     let nameNode = genreNode.children.find(node => node.name === game.Name);
    if (!nameNode) {
      nameNode = {name: game.Name, children: []};
      genreNode.children.push(nameNode);
    }

    
    if (genreNode.children.length < limit_games_per_genre) {
      
      let SalesNode = nameNode.children.find(node => node.name === game.Global_Sales);
    if (!SalesNode) {
      SalesNode = {name: ["UNITS SOLDS",game.Global_Sales], children: []};
      nameNode.children.push(SalesNode);
    }
      let SalesNode1 = {name: ["NA ",game.NA_Sales], value: game.NA_Sales}
      let SalesNode2 = {name: ["OTHER", game.Other_Sales], value: game.Other_Sales}
      let SalesNode3 = {name: ["EU", game.EU_Sales], value: game.EU_Sales}
      let SalesNode4 = {name: ["JP", game.JP_Sales], value: game.JP_Sales};
      SalesNode.children.push(SalesNode1);
      SalesNode.children.push(SalesNode2);
      SalesNode.children.push(SalesNode3);
      SalesNode.children.push(SalesNode4);
    }
    
  });

  return rootNode;
}
)}

function _filtered_data2(filtered_data,selected_game){return(
filtered_data.filter(game => selected_game.includes(game.Name))
)}

function _18(Plot,filtered_data2){return(
Plot.auto(filtered_data2, {x: "Platform", y: "Global_Sales", fx: "Name", mark: "bar", color: "Platform"}).plot({x: {grid: true}, y: {label: "Global Units sold of selected game [mio]"}, color: {legend: true, scheme: "Rainbow"}, marginTop: 50, marginLeft: 50, marginBottom: 50})
)}

function _data(buildHierarchy,filtered_data){return(
buildHierarchy(filtered_data)
)}

function _partition(d3){return(
data => {
  const root = d3.hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);
  return d3.partition()
      .size([2 * Math.PI, root.height + 1])
    (root);
}
)}

function _color(d3,data){return(
d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1))
)}

function _format(d3){return(
d3.format(",d")
)}

function _width(){return(
932
)}

function _radius(width){return(
width / 6
)}

function _arc(d3,radius){return(
d3.arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
    .padRadius(radius * 1.5)
    .innerRadius(d => d.y0 * radius)
    .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1))
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["version_json@5.json", {url: new URL("./files/fc5eff23737076b758d576073c731fba395aff6ede3280dab429d2b4fb36d64204f46369dd7beafdab2374955ba46061fccad0f99c75adf4bed833f8be725468.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("chart")).define("chart", ["partition","data","d3","width","color","arc","format","radius"], _chart);
  main.variable(observer("data_raw")).define("data_raw", ["FileAttachment"], _data_raw);
  main.variable(observer()).define(["data_raw"], _6);
  main.variable(observer("viewof choice")).define("viewof choice", ["Inputs"], _choice);
  main.variable(observer("choice")).define("choice", ["Generators", "viewof choice"], (G, _) => G.input(_));
  main.variable(observer("list_platform")).define("list_platform", ["data_raw"], _list_platform);
  main.variable(observer("list_genre")).define("list_genre", ["data_raw"], _list_genre);
  main.variable(observer("viewof Selection_platform")).define("viewof Selection_platform", ["choice","Inputs","list_platform","html"], _Selection_platform);
  main.variable(observer("Selection_platform")).define("Selection_platform", ["Generators", "viewof Selection_platform"], (G, _) => G.input(_));
  main.variable(observer("viewof Selection_genre")).define("viewof Selection_genre", ["choice","Inputs","list_genre","html"], _Selection_genre);
  main.variable(observer("Selection_genre")).define("Selection_genre", ["Generators", "viewof Selection_genre"], (G, _) => G.input(_));
  main.variable(observer("viewof limit_games_per_genre")).define("viewof limit_games_per_genre", ["Inputs"], _limit_games_per_genre);
  main.variable(observer("limit_games_per_genre")).define("limit_games_per_genre", ["Generators", "viewof limit_games_per_genre"], (G, _) => G.input(_));
  main.variable(observer("filtered_data")).define("filtered_data", ["data_raw","Selection_platform","Selection_genre"], _filtered_data);
  main.variable(observer("viewof selected_game")).define("viewof selected_game", ["Inputs","filtered_data"], _selected_game);
  main.variable(observer("selected_game")).define("selected_game", ["Generators", "viewof selected_game"], (G, _) => G.input(_));
  main.variable(observer("buildHierarchy")).define("buildHierarchy", ["limit_games_per_genre"], _buildHierarchy);
  main.variable(observer("filtered_data2")).define("filtered_data2", ["filtered_data","selected_game"], _filtered_data2);
  main.variable(observer()).define(["Plot","filtered_data2"], _18);
  main.variable(observer("data")).define("data", ["buildHierarchy","filtered_data"], _data);
  main.variable(observer("partition")).define("partition", ["d3"], _partition);
  main.variable(observer("color")).define("color", ["d3","data"], _color);
  main.variable(observer("format")).define("format", ["d3"], _format);
  main.variable(observer("width")).define("width", _width);
  main.variable(observer("radius")).define("radius", ["width"], _radius);
  main.variable(observer("arc")).define("arc", ["d3","radius"], _arc);
  return main;
}
