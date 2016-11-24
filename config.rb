require 'compass/import-once/activate'
# Require any additional compass plugins here.

# Syntax
preferred_syntax = :scss

# Paths
http_path = "/"
images_dir = "img"
images_path = "/img/"
javascripts_dir = "js"
sass_dir = "scss/"
css_dir = "css/"
cache_path = "c:/compass/cache/itelios/"
relative_assets = true

if environment == :development
    line_comments = true
    output_style = :nested
    sass_options = {:debug_info => false}
end

if environment == :production
    line_comments = false
    output_style = :compressed
    sass_options = {:debug_info => false}
    css_dir = "css/prod"

    require 'fileutils'
        on_stylesheet_saved do |file|
            if File.exists?(file)
            filename = File.basename(file, File.extname(file))
            #File.rename(file, "css" + "/" + filename + ".min" + File.extname(file))
        end
    end
end 