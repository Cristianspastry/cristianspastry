

// router.tsx

interface Routers {
    Home: {
        name: string,
        link: string
    },
    Search: {
        name: string,
        link: string
    },
    Recipes: {
        name: string,
        link: string,
        subLinks : string
    },
    Tips: {
        name: string,
        link: string
    },
    About: {
        name: string,
        link: string
    },
    Admin : {
        name: string,
        link: string,
        subLinks : {
            addRecipe : string,
            editRecipe : string,
        }
    }
}

const Routers : Routers = {
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
    },
    Admin : {
        name: 'Admin',
        link: '/admin',
        subLinks : {
            addRecipe : '/admin/recipes/add',
            editRecipe : '/admin/recipes/edit/:slug',
        }
    }
}
export default Routers; 