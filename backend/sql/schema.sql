-- Unified schema for Hibiscus Immobilière

create type property_status as enum ('a_vendre', 'a_louer', 'vendu', 'loue');
create type property_type as enum ('appartement', 'villa', 'terrain', 'bureau', 'local_commercial');

create table properties (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  status property_status not null,
  type property_type not null,
  price numeric null,
  price_per_meter numeric null,
  total_area numeric not null,
  typology varchar null,
  location_fr text not null,
  location_ar text not null,
  title_fr text not null,
  title_ar text not null,
  description_fr text not null,
  description_ar text not null,
  virtual_tour_url text null,
  is_featured boolean not null default false,
  amenities text[] not null default array[]::text[],
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create table property_images (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  image_url text not null,
  display_order int not null default 0,
  is_cover boolean not null default false
);

create table whatsapp_leads (
  id uuid primary key default gen_random_uuid(),
  property_id uuid null references properties(id) on delete set null,
  detected_lang varchar not null,
  clicked_at timestamp with time zone not null default now()
);

create or replace function refresh_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger properties_updated_at
before update on properties
for each row
execute function refresh_updated_at_column();

create trigger property_images_updated_at
before update on property_images
for each row
execute function refresh_updated_at_column();

create trigger whatsapp_leads_updated_at
before update on whatsapp_leads
for each row
execute function refresh_updated_at_column();
