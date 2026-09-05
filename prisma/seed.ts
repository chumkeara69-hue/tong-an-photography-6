import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

const photos = [
  ["Silence of Angkor","silence-of-angkor","Ancient stone and morning mist at Angkor Wat.","Cambodia",18,"https://lh3.googleusercontent.com/aida-public/AB6AXuA8f4qGC99L5JxRCdLKNOPIrkpxPR5ArQ4YqClVN_O2UKRVzLseoni6MWRwbX7xn1JdVcpa25m8W9TP_00Z5YQiQ3kTgjKr8GPhASf165QJhWU7OFnHYsUsdLc0JbmX1eYWNPGFZ1q3N9wAurm7M_ATW7uxTodNobEQ8ghp5655kImmho8QzqXdVm7T_aRRaQUcdFgVIHW_QmW4YSYfbl5ABJudct69ho02A4NrcrXoN5mNQ2oyQK2gIQ"],
  ["Neon Drift","neon-drift","A cinematic night study of color, motion and city light.","Urban",15,"https://lh3.googleusercontent.com/aida-public/AB6AXuB7Q9VtTea_2cuXGBQwdoU9kaYLkbyGn6gIxhTaWHK6fw8fkPbZWXLnaUwZMBP-jCjEcMf_0lKF175ccokz7CVnnC9b-6_ftU-IFbDZ5WmD1Fv-Y8ynpBG4nCCK10GK-Hzp7VqHqIVkHdcmlJsQz6VMZgSbMlCuEVlDyxGz8La-rEvoVlzZ9Tf3uyZDckQgYva6hG3Sbn2YCfuYpmQNgJLXklMXwLvRw-HHbh4gqUAKUGEzHAmWevQZww"],
  ["The Carver's Hands","the-carvers-hands","Hands, tools and heritage in a quiet workshop.","People",22,"https://lh3.googleusercontent.com/aida-public/AB6AXuCE9xOvPWiwyRRYh3McHERfa9HRGMc5f476y45AAsVChyvPkVxeCXhfXENkssKvjBDH7DZbvJOR3IzwnbGoZwpDdh2PvycfojlH86_mKNI-gmVQTbcW9RcmtBdcjUbK9eIMcaoAXhtiFfRKogyD4XbYgJV-LMpTH4FVyRoAZyOzhYZzKsXoKGsoRdtqppLiXSotKB6JaimgJU-jSJvXs0lfIxmV1kmmWWDF8Dr0W-TPaqe56dJDR-I6EA"],
  ["Golden Thread","golden-thread","Warm light and a solitary figure in the late afternoon.","Portrait",20,"https://lh3.googleusercontent.com/aida-public/AB6AXuCv2x0EAGzrvKUuGfyf5PQ4jKK7Z6GvVInpL1ik8pGOcrsy3HjzNNOkugmEmCft-t6MHJOGOiuH2uGzSKAWYnIiEIJf4sGdc3JbfQnSGLXkhxbBodIs-mYDQyh1FwOYlqY7mDo2RYuMWv-mRi6YD8Oo6g5VkZE_SPXJxLlKb2BBl1E5TyOhmL59vglYksJtzEF5RJW1Icq5l4TeOEsoieB9K7E1nAF17nK_TWs5jcv6XdOwOybxIH3W7w"]
] as const;

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@example.com";
  const password = process.env.ADMIN_PASSWORD || "change-me-before-production";
  if (process.env.NODE_ENV === "production" && !process.env.ADMIN_PASSWORD) throw new Error("ADMIN_PASSWORD is required in production");
  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.admin.upsert({ where:{email}, update:{passwordHash}, create:{email,passwordHash} });
  for (const [title,slug,description,category,price,previewKey] of photos) {
    await prisma.photo.upsert({
      where:{slug},
      update:{title,description,category,price,previewKey,originalKey:`demo/original/${slug}.jpg`},
      create:{title,slug,description,category,price,previewKey,originalKey:`demo/original/${slug}.jpg`}
    });
  }
}
main().finally(()=>prisma.$disconnect());
