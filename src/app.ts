export default async function main(envs: Record<string, string | undefined>): Promise<void> {
  console.log(envs.PORT);
}

await main(process.env);
