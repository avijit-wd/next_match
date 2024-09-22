import { auth, signOut } from "@/auth";
import { Button } from "@nextui-org/react";

export default async function Home() {
  const session = await auth();
  return (
    <div>
      Hello app!
      <h3 className="text-2xl font-semibold">User session data: </h3>
      {session ? (
        <div>
          <pre>{JSON.stringify(session)}</pre>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button color="primary" variant="bordered" type="submit">
              Sign out
            </Button>
          </form>
        </div>
      ) : (
        <div>Not signed in</div>
      )}
    </div>
  );
}
