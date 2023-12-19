/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'www.misya.info',
              port: '',
              pathname: '/wp-content/**',
            },
            {
              protocol: 'https',
              hostname: 'www.media.istockphoto.com',
              port: '',
              pathname: '/id/**',
            },
            {
              protocol :'https',
              hostname : 'cristianspastry.altervista.org',
              port : '',
              pathname : '/wp-content/uploads/**',
            }
          ],
    },
}
//"https://cristianpastry.altervista.org/wp-content/uploads/2022/10/Torta-di-Mele-768x576.jpeg"
//"https://media.istockphoto.com/id/480379752/it/foto/cook-decorare-un-piatto.jpg?s=1024x1024&w=is&k=20&c=EfxCFR_rrbe9gwtWdFHvAX4rYyKmgeUSngCgfqaOPoo="
//"https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fHww"
module.exports = nextConfig
