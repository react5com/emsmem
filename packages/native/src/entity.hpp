#pragma once
#include <cstdio>

class Entity
{
public:
  Entity() = delete;
  Entity(Entity &&other) noexcept;
  Entity(const Entity &copy);
  Entity &operator=(const Entity &other);
  Entity &operator=(Entity &&other) noexcept;
  Entity(int x);
  virtual ~Entity();
  int getX();

private:
  int *px = nullptr;
};