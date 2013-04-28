# All files in the 'lib' directory will be loaded
# before nanoc starts compiling.

include Nanoc3::Helpers::Blogging
include Nanoc3::Helpers::LinkTo
include Nanoc3::Helpers::Rendering
include Nanoc3::Helpers::XMLSitemap
include Nanoc3::Helpers::Tagging

def link_to_with_current(text, path, desc)
  if @item_rep and @item_rep.path == path
    "<li class='current'>#{link_to(text, path, :'data-description' => desc)}</li>"
  else
    "<li>#{link_to(text, path, :'data-description' => desc)}</li>"
  end
end

def combined(assets, type='css')
  content = []

  assets.each do |asset|
    item = @items.find { |i| i.identifier == "/#{type}/#{asset}/" }
    if item
      content << item.compiled_content
    end
  end

  content.join("\n")
end
