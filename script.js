class Route {
  routes = {};

  add(nome, page) {
    return (this.routes[nome] = page);
  }

  route(event) {
    event = event || window.event;
    event.preventDefault();

    window.history.pushState({}, "", event.target.href);
    this.handle();
  }

  handle() {
    const { pathname } = window.location;
    console.log(pathname);
    const route = this.routes[pathname] || this.routes[404]; //estou setando a variável route para a rota que eu quero, ela vai buscar o arquivo html lá no objeto routes que criei

    fetch(route)
      .then((data) => data.text())
      .then((text) => (document.querySelector("#app").innerHTML = text));
  }
}

const routes = new Route();
routes.add("/home", "/desafio/index.html");
routes.add("/universo", "/desafio/universo.html");
routes.add("/exploracao", "/desafio/exploracao.html");

window.onpopstate = () => router.handle();

window.route = () => routes.route();
