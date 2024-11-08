

// router.tsx

const Routers = {
    Home: {
        name: 'Home',
        link: '/'
    },
    Search: {
        name: 'Search',
        link: '/search'
    },
    Recipes: {
        name: 'Recipes',
        link: '/recipe',
        subLinks : '/recipe/:slug'
    },
    Tips: {
        name: 'Tips',
        link: '/tips'
    },
    About: {
        name: 'About',
        link: '/about'
    }

}
export default Routers; 