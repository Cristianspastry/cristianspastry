import Recipe from "@/models/recipe";

export const allRecipes: Recipe[] = [
    {
        id: 1,
        slug: "torta-di-mele-alla-cannella",
        title: "Torta di Mele alla Cannella",
        description: "Una torta soffice e profumata alla cannella, perfetta per ogni occasione.",
        image: "/assets/img/tortadimele.jpg",
        prepTime: "1 ora",
        difficulty: "Facile",
        ingredients: [
            {
                name: "Per l'impasto",
                ingredients: [
                    "200 g di farina",
                    "150 g di zucchero",
                    "1 uovo",
                    "80 ml di olio di semi",
                    "120 ml di latte",
                    "1 cucchiaino di lievito",
                    "100 g di mirtilli freschi",
                ],
            },
            {
                name: "Per la decorazione",
                ingredients: ["zucchero a velo in quantita"],
            }
        ],
        steps: [
            "In una ciotola, sbatti le uova con lo zucchero fino a ottenere un composto chiaro.",
            "Aggiungi il latte e l'olio, quindi incorpora la farina e il lievito.",
            "Aggiungi le mele e la cannella.",
            "Versa l'impasto in una teglia imburrata e infarinata e cuoci a 180°C per 40 minuti."
        ],
        isSpecial: true,
        createdAt: "2022-01-01",
        isPopular: false,
        tips: []
    },
    {
        id: 2,
        slug: "brownies-al-cioccolato-e-noci",
        title: "Brownies al Cioccolato e Noci",
        description: "Deliziosi brownies al cioccolato con un tocco croccante di noci.",
        image: "/assets/img/brownie.jpg",
        prepTime: "45 minuti",
        difficulty: "Media",
        ingredients: [
            "200 g di cioccolato fondente",
            "150 g di burro",
            "150 g di zucchero",
            "3 uova",
            "80 g di farina",
            "50 g di noci tritate",
            "1 pizzico di sale"
        ],
        steps: [
            "Sciogli il cioccolato e il burro a bagnomaria.",
            "In una ciotola, sbatti le uova con lo zucchero, poi aggiungi il cioccolato fuso.",
            "Incorpora la farina, il sale e le noci.",
            "Versa in una teglia rettangolare e cuoci a 180°C per 25 minuti."
        ],
        isSpecial: false,
        createdAt: "2022-02-15",
        isPopular: false
    },
    {
        id: 3,
        slug: "cheesecake-ai-frutti-di-bosco",
        title: "Cheesecake ai Frutti di Bosco",
        description: "Una cheesecake fresca e cremosa, perfetta per l'estate.",
        image: "/assets/img/cheescake.jpg",
        prepTime: "4 ore",
        difficulty: "Media",
        ingredients: [
            "200 g di biscotti secchi",
            "100 g di burro fuso",
            "500 g di formaggio cremoso",
            "100 g di zucchero",
            "200 ml di panna",
            "3 fogli di gelatina",
            "Frutti di bosco per guarnire"
        ],
        steps: [
            "Frulla i biscotti e mescolali con il burro fuso.",
            "Pressa il composto in uno stampo a cerniera.",
            "Ammorbidisci la gelatina in acqua fredda, scioglila in poca panna calda e aggiungila al formaggio con lo zucchero.",
            "Aggiungi la panna montata e versa sulla base di biscotti. Lascia in frigo per 4 ore, quindi guarnisci con i frutti di bosco."
        ],
        isSpecial: false,
        createdAt: "2022-03-10",
        isPopular: false
    },
    {
        id: 4,
        slug: "tiramisu-classico",
        title: "Tiramisù Classico",
        description: "Il classico dolce italiano al caffè, cremoso e irresistibile.",
        image: "/assets/img/tiramisu.jpg",
        prepTime: "2 ore",
        difficulty: "Facile",
        ingredients: [
            "300 g di savoiardi",
            "4 uova",
            "100 g di zucchero",
            "500 g di mascarpone",
            "Caffè espresso q.b.",
            "Cacao amaro per spolverizzare"
        ],
        steps: [
            "Separa i tuorli dagli albumi.",
            "Sbatti i tuorli con lo zucchero fino a ottenere un composto chiaro, poi aggiungi il mascarpone.",
            "Monta gli albumi a neve e incorporali delicatamente.",
            "Inzuppa i savoiardi nel caffè e disponili in uno strato. Copri con la crema e ripeti.",
            "Spolverizza con cacao amaro e lascia in frigo per 2 ore."
        ],
        isSpecial: false,
        createdAt: "2022-04-20",
        isPopular: false
    },
    {
        id: 5,
        slug: "muffin-ai-mirtilli",
        title: "Muffin ai Mirtilli",
        description: "Muffin soffici e leggeri con mirtilli freschi.",
        image: "/assets/img/muffin.jpg",
        prepTime: "30 minuti",
        difficulty: "Facile",
        moldSize: "22 cm",
        ingredients: [
            "200 g di farina",
            "150 g di zucchero",
            "1 uovo",
            "80 ml di olio di semi",
            "120 ml di latte",
            "1 cucchiaino di lievito",
            "100 g di mirtilli freschi"
        ],
        steps: [
            "Mescola la farina, il lievito e lo zucchero.",
            "A parte, unisci l'uovo, il latte e l'olio.",
            "Versa i liquidi negli ingredienti secchi e mescola.",
            "Aggiungi i mirtilli, versa l’impasto nei pirottini e cuoci a 180°C per 20-25 minuti."
        ],
        isSpecial: true,
        createdAt: "2022-05-05",
        isPopular: true,
        tips: ["Lasciare il muffin in frigo per 1 ora prima di servirlo."],
        conservation: "Lasciare in frigo per 1 ora prima di servirlo."
    }
];
