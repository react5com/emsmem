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
  std::string getName() const;
  Entity &getFirstEntity() const;
  std::vector<Entity>& getAllEntities() const;
  std::vector<int> getIndexes() const
  {
    return std::vector<int>{1, 2, 3};
  }

private:
  mutable std::vector<Entity> result;
};