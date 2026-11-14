import { PrismaClient, Tier } from '@prisma/client';
import bcrypt from 'bcryptjs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('🌟 Seeding Default Hero User & Badges into Supabase PostgreSQL...');

  // 1. Seed Badges
  const badgesPath = path.resolve(__dirname, '../../scripts/generatePixelBadges.js');
  try {
    const badgesScript = require(badgesPath);
    // scripts/generatePixelBadges.js defines BADGE_DEFS or writes catalog
  } catch (err) {
    // If not directly exported, define or load from catalog
  }

  // Check how many sublevels exist
  const sublevels = await prisma.sublevel.findMany({ select: { id: true, title: true, tier: true } });
  console.log(`Found ${sublevels.length} sublevels in Supabase.`);

  for (const sub of sublevels) {
    await prisma.badge.upsert({
      where: { sublevelId: sub.id },
      update: {
        title: `${sub.title} Medal`,
        description: `Conquered ${sub.title} mastery trial across all stages.`,
        tier: sub.tier,
        xpReward: sub.tier === 'ADVANCED' ? 1000 : sub.tier === 'INTERMEDIATE' ? 750 : 500,
      },
      create: {
        sublevelId: sub.id,
        title: `${sub.title} Medal`,
        description: `Conquered ${sub.title} mastery trial across all stages.`,
        iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" fill="#FFD54F"/></svg>`,
        tier: sub.tier,
        xpReward: sub.tier === 'ADVANCED' ? 1000 : sub.tier === 'INTERMEDIATE' ? 750 : 500,
      },
    });
  }
  console.log(`✅ Seeded ${sublevels.length} Badges into Supabase.`);

  // 2. Seed Default User (aryan / bindagearyan@gmail.com)
  const passwordHash = await bcrypt.hash('password123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'bindagearyan@gmail.com' },
    update: {
      username: 'aryan',
      xp: 150,
      gems: 100,
      hearts: 5,
      streakCount: 3,
      selectedLevel: 'BEGINNER',
    },
    create: {
      id: 'user_default_aryan',
      email: 'bindagearyan@gmail.com',
      username: 'aryan',
      passwordHash,
      avatar: 'default_avatar.png',
      xp: 150,
      gems: 100,
      hearts: 5,
      streakCount: 3,
      selectedLevel: 'BEGINNER',
      currentLeague: 'BRONZE',
    },
  });
  console.log(`✅ Seeded Default User: ${user.email} (${user.username})`);

  // 3. Seed User Progress for Default User
  await prisma.userProgress.upsert({
    where: {
      userId_sublevelId: {
        userId: user.id,
        sublevelId: 1,
      },
    },
    update: {
      currentStage: 3,
      isCompleted: true,
    },
    create: {
      userId: user.id,
      sublevelId: 1,
      currentStage: 3,
      isCompleted: true,
    },
  });

  await prisma.userProgress.upsert({
    where: {
      userId_sublevelId: {
        userId: user.id,
        sublevelId: 2,
      },
    },
    update: {
      currentStage: 3,
      isCompleted: true,
    },
    create: {
      userId: user.id,
      sublevelId: 2,
      currentStage: 3,
      isCompleted: true,
    },
  });

  await prisma.userProgress.upsert({
    where: {
      userId_sublevelId: {
        userId: user.id,
        sublevelId: 3,
      },
    },
    update: {
      currentStage: 1,
      isCompleted: false,
    },
    create: {
      userId: user.id,
      sublevelId: 3,
      currentStage: 1,
      isCompleted: false,
    },
  });

  console.log(`✅ Seeded Initial Progress for ${user.username}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

