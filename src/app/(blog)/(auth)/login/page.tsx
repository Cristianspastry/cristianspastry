// app/login/page.tsx
import LoginForm from '@/components/form/loginForm';

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Login Amministratore</h1>
      <LoginForm />
    </div>
  );
}