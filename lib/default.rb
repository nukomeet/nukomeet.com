# All files in the 'lib' directory will be loaded
# before nanoc starts compiling.
require 'nanoc/cachebuster'

include Nanoc3::Helpers::Blogging
include Nanoc3::Helpers::LinkTo
include Nanoc3::Helpers::Rendering
include Nanoc3::Helpers::XMLSitemap
include Nanoc3::Helpers::Tagging
include Nanoc::Helpers::CacheBusting

def link_to_with_current(text, path, desc)
  if @item_rep and @item_rep.path == path
    "<li class='active'>#{link_to(text, path, :'data-description' => desc)}</li>"
  else
    "<li>#{link_to(text, path, :'data-description' => desc)}</li>"
  end
end

def items_by_author(author)
  @items.select { |i| (i[:authors] || []).include?(author) }
end

def projects
  @items.select { |item| item[:kind] == 'project' }
end

def sorted_projects
  projects.sort_by do |a|
    attribute_to_time(a[:created_at])
  end.reverse
end
