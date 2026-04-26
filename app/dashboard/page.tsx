import AddProjectForm from './AddProjectForm';
import { renameProject, deleteProject } from '../actions/projects';

const BASE_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

export default async function DashboardPage() {
  const res = await fetch(`${BASE_URL}/api/projects`, { cache: 'no-store' });
  const projects = await res.json();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>

      <AddProjectForm />

      <ul>
        {projects.map((p: any) => (
          <li key={p.id} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>

            {/* Rond de couleur */}
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: p.color, display: 'inline-block' }} />

            {/* Lien vers le projet */}
            <a href={`/projects/${p.id}`}>{p.name}</a>

            {/* Bouton Renommer */}
            <form action={renameProject} style={{ display: 'inline' }}>
              <input type="hidden" name="id" value={p.id} />
              <input type="hidden" name="color" value={p.color ?? ''} />
              <input type="text" name="newName" placeholder="Nouveau nom" required
                style={{ padding: '2px 6px', borderRadius: 4, border: '1px solid #ccc' }} />
              <button type="submit" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                ✏️
              </button>
            </form>

            {/* Bouton Supprimer */}
            <form action={deleteProject} style={{ display: 'inline' }}>
              <input type="hidden" name="id" value={p.id} />
              <button type="submit" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                🗑
              </button>
            </form>

          </li>
        ))}
      </ul>
    </div>
  );
}