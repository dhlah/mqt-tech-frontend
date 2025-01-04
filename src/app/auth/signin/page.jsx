import { signIn } from "@/lib/auth"

export default function SignInPage() {
    return (
        <form
            action={async (formData) => {
                "use server"
                await signIn("credentials", formData)
            }}
        >
            <label>
                Email
                <input name="email" type="text" />
            </label>
            <label>
                Password
                <input name="password" type="text" />
            </label>
            <button>Sign In</button>
        </form>
    )
}