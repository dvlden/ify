# IFY

A simple URL shortener built for personal needs.
Feed it with an URL, it will respond with a slug that you can then use instead.

| Input          | Output              |
| -------------- | ------------------- |
| https://dvl.sh | https://ify.lol/0KY |

> Not a real representation of the output, but simplified for clarity.

I have a CNAME of https://r.dvl.sh which maps to https://ify.lol for convenience,
as I'm using this shortener internally within my personal website: https://dvl.sh

If you want to use this URL shortener for your personal needs, you won't be able to use it through https://ify.lol as it will require an `Access-Token`.
This is a security precaution, as I want the database to contain the links that I use in my blog posts only.
Aside, whenever I make a breaking change, I do not want your links to simply disappear from the database.

Feel free to clone or fork this repo, make desired changes _(if any)_ and deploy it yourself wherever you want.

## Usage

### Api

With just two endpoints, you can do the necessary task.

1. **GET** `/api/[slug]` - to retrieve `JSON` data of an record by the identifier _(slug)_
2. **POST** `/api` - to store an URL and retrieve `JSON` for that record

### Redirect

The redirect is handled by the middleware, if the given slug is found, otherwise, it will remain there with `404` status.

1. `/[slug]`

## Deployment

Personally deployed on [▲ Vercel](https://vercel.com) and database on [PlanetScale](https://planetscale.com/).
There are a few environment variables that you need to fill, and everything will work as expected. Refer to `.env.example`.
