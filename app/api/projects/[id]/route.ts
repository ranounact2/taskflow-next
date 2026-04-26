import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'db.json');

function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}

function writeDB(data: any) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// ─── GET /api/projects/[id] ────────────────────────────────────────────────────
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const db = readDB();
  const project = db.projects.find((p: any) => p.id === params.id);

  if (!project) {
    return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 });
  }

  return NextResponse.json(project);
}

// ─── PUT /api/projects/[id] ────────────────────────────────────────────────────
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const db = readDB();
  const index = db.projects.findIndex((p: any) => p.id === params.id);

  if (index === -1) {
    return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 });
  }

  // Modifier name et color
  db.projects[index] = {
    ...db.projects[index],
    name: body.name ?? db.projects[index].name,
    color: body.color ?? db.projects[index].color,
  };

  writeDB(db);
  return NextResponse.json(db.projects[index]);
}

// ─── DELETE /api/projects/[id] ─────────────────────────────────────────────────
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const db = readDB();
  const index = db.projects.findIndex((p: any) => p.id === params.id);

  if (index === -1) {
    return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 });
  }

  db.projects.splice(index, 1);
  writeDB(db);

  return NextResponse.json({ message: 'Projet supprimé' }, { status: 200 });
}