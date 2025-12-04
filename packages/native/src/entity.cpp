#include "entity.hpp"

Entity::Entity(Entity &&other) noexcept : px(other.px)
{
  printf("Entity move constructor called\n");
  other.px = nullptr;
}

Entity::Entity(const Entity &copy) : px(new int(*(copy.px)))
{
  printf("Entity copy constructor called\n");
}

Entity &Entity::operator=(const Entity &other)
{
  printf("Entity copy assignment operator called\n");
  if (this != &other)
  {
    delete px;
    px = new int(*(other.px));
  }
  return *this;
}

Entity &Entity::operator=(Entity &&other) noexcept
{
  printf("Entity move assignment operator called\n");
  if (this != &other)
  {
    delete px;
    px = other.px;
    other.px = nullptr;
  }
  return *this;
}

Entity::Entity(int x) : px(new int(x))
{
  printf("Entity constructor called\n");
}

Entity::~Entity()
{
  printf("Entity destructor called\n");
  delete px;
}

int Entity::getX()
{
  return *px;
}
