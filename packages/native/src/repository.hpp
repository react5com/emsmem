#pragma once
#include <cstdio>
#include <vector>
#include "entity.hpp"

class Repository
{
public:
  Repository();
  Repository(const Repository &copy);
  Repository(Repository &&other) noexcept;
  virtual ~Repository();
  Entity &getFirstEntity() const;
  std::vector<Entity>& getAllEntities() const;
private:
  mutable std::vector<Entity> result;
};