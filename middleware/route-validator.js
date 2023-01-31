export default function ({app, route}) {
  setTimeout(() => {
    // If current layout
    switch (app.router.app.$data.layoutName) {
      case 'default': {
        const layout = app.router.app.$children.find(data=>data.$el === document.getElementById("layout"));
        console.log(layout)
        // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
      }
      break;
    }
  }, 400);
}
