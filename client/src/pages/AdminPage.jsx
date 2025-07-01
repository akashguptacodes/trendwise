import AdminPanel from "../components/admin/AdminPanel";
import useAuth from "../hooks/useAuth";
import ProtectedRoute from "../components/auth/ProtectedRoute";

function AdminPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-6">
        <AdminPanel user={user} />
      </div>
    </ProtectedRoute>
  );
}

export default AdminPage;
