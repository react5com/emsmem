#include "repository.hpp"

Repository::Repository()
{
  printf("Repository constructor called\n");
  result.emplace_back(1);
}

Repository::Repository(const Repository &copy)
{
  printf("Repository copy constructor called\n");
  result = copy.result;
}

Repository::Repository(Repository &&other) noexcept : result(std::move(other.result))
{
  printf("Repository move constructor called\n");
}

Repository::~Repository()
{
  printf("Repository destructor called\n");
}

Entity &Repository::getFirstEntity() const
{
  return result[0];
}

std::vector<Entity>& Repository::getAllEntities() const
{
  printf("getAllEntities called\n");
  return result;
}


#include <emscripten/bind.h>
using namespace emscripten;

EMSCRIPTEN_BINDINGS(my_module)
{
  register_vector<Entity>("EntityVector");
  class_<Entity>("Entity")
      .constructor<int>()
      .function("getX", &Entity::getX);
  class_<Repository>("Repository")
      .constructor<>()
      .function("getAllEntities", &Repository::getAllEntities, return_value_policy::reference())
      .function("getFirstEntity", &Repository::getFirstEntity, return_value_policy::reference())
      .function("getFirstEntityVal", &Repository::getFirstEntity);
}