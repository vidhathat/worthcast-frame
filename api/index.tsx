import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'
import {  pinata } from 'frog/hubs'
import { handle } from 'frog/vercel'
// import { neynar } from 'frog/middlewares'

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }

export const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  // Supply a Hub to enable frame verification.
  // hub: pinata('');
})
// .use(
//   neynar({
//     apiKey: '',
//     features: ['interactor', 'cast'],
//   }))

app.frame('/', (c) => {
  const { buttonValue, inputText, status, frameData } = c
  console.log('frame data', frameData);
//   const { displayName, custodyAddress } = c.var.interactor || {}
// console.log('display name', displayName);
//   console.log('custody add', custodyAddress);
  const fruit = inputText || buttonValue
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background:
            status === 'response'
              ? 'linear-gradient(to right, #432889, #17101F)'
              : 'black',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {status === 'response'
            ? `Nice choice.${fruit ? ` ${fruit.toUpperCase()}!!` : ''}`
            : 'Worthcast- Discover networth and top communities!'}
        </div>
      </div>
    ),
    intents: [
      // <TextInput placeholder="Enter custom fruit..." />,
      <Button value="apples">Check my stats!</Button>,
      <Button.Link href="https://chromewebstore.google.com/detail/worthcast/pppcalafiadkhnkiahhfaahglgkomncc">Install Now</Button.Link>    ],
  })
})

// app.frame('/portfolio', (c) => {
//   const { status } = c;
//   const { displayName } = c.var.interactor || {}
//   console.log('interactor: ', c.var.interactor)

//   if (status === 'response' && displayName) {
//     let response = await fetch(`https://extension-backend.vercel.app/user-data/${username}`);
//     console.log("Response: ", response);
//     let data = await response.json();
//     let portfolioValue = data?.total_nft_portfolio;

//   return c.res({
//     image: (
//       <div
//         style={{
//           alignItems: 'center',
//           color: 'white',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           gap: 28,
//           fontSize: 48,
//           height: '100%',
//           width: '100%',
//         }}
//       >
//         Greetings {displayName},
//         Your Portfolio data worth is {portfolioValue}
//       </div>
//     ),
//   })
// })


// @ts-ignore
const isEdgeFunction = typeof EdgeFunction !== 'undefined'
const isProduction = isEdgeFunction || import.meta.env?.MODE !== 'development'
devtools(app, isProduction ? { assetsPath: '/.frog' } : { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
