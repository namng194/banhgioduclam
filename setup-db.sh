#!/bin/bash
# Quick Database Setup Script

echo "🗄️  DATABASE SETUP"
echo ""
echo "Chọn một option:"
echo ""
echo "1. Neon (FREE - Recommended) - 30 giây"
echo "2. Supabase (FREE) - 1 phút"
echo "3. Local PostgreSQL - 5 phút"
echo ""
read -p "Chọn (1-3): " choice

case $choice in
  1)
    echo ""
    echo "📌 NEON SETUP (30 giây)"
    echo ""
    echo "1. Mở: https://console.neon.tech/signup"
    echo "2. Đăng ký (GitHub login nhanh nhất)"
    echo "3. Create project → Chọn region: Singapore"
    echo "4. Copy 'Connection string' (Pooled connection)"
    echo ""
    read -p "Paste connection string: " DB_URL
    
    if [ ! -z "$DB_URL" ]; then
      cat > .env << EOF
DATABASE_URL=$DB_URL
PORT=5000
NODE_ENV=development
EOF
      echo ""
      echo "✅ .env updated!"
      echo ""
      echo "📊 Push schema to database:"
      export DATABASE_URL="$DB_URL"
      npm run db:push
      echo ""
      echo "✅ Done! Run: npm run dev"
    fi
    ;;
    
  2)
    echo ""
    echo "📌 SUPABASE SETUP (1 phút)"
    echo ""
    echo "1. Mở: https://supabase.com/dashboard"
    echo "2. New project"
    echo "3. Database password (save it!)"
    echo "4. Region: Southeast Asia"
    echo "5. Settings → Database → Connection string → URI"
    echo ""
    read -p "Paste connection string: " DB_URL
    
    if [ ! -z "$DB_URL" ]; then
      cat > .env << EOF
DATABASE_URL=$DB_URL
PORT=5000
NODE_ENV=development
EOF
      echo ""
      echo "✅ .env updated!"
      echo ""
      echo "📊 Push schema to database:"
      export DATABASE_URL="$DB_URL"
      npm run db:push
      echo ""
      echo "✅ Done! Run: npm run dev"
    fi
    ;;
    
  3)
    echo ""
    echo "📌 LOCAL POSTGRESQL"
    echo ""
    echo "Install PostgreSQL:"
    echo "  Ubuntu/Debian: sudo apt install postgresql postgresql-contrib"
    echo "  macOS: brew install postgresql"
    echo ""
    echo "Setup:"
    echo "  sudo -u postgres psql"
    echo "  CREATE DATABASE banhgioduclam;"
    echo "  CREATE USER myuser WITH PASSWORD 'mypassword';"
    echo "  GRANT ALL PRIVILEGES ON DATABASE banhgioduclam TO myuser;"
    echo "  \\q"
    echo ""
    echo "Then update .env with:"
    echo "  DATABASE_URL=postgresql://myuser:mypassword@localhost:5432/banhgioduclam"
    ;;
    
  *)
    echo "Invalid choice"
    ;;
esac
