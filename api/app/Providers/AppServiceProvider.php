<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
        $modPath = app_path('Mod');
        foreach (glob("{$modPath}/*", GLOB_ONLYDIR) as $mod) {
            // routes
            $routesPath = $mod . '/routes/api_admin.php';
            if (file_exists($routesPath)) {
                $this->loadRoutesFrom($routesPath);
            }

            $routesPath = $mod . '/routes/api_front.php';
            if (file_exists($routesPath)) {
                $this->loadRoutesFrom($routesPath);
            }

            // config
            $configPath = $mod . '/config';
            if (is_dir($configPath)) {
                foreach (glob("{$configPath}/*.php") as $configFile) {
                    $configName = basename($configFile, '.php');
                    $this->mergeConfigFrom($configFile, $configName);
                }
            }

            // migration
            $migrationPath = $mod . '/Database/migrations';
            if (is_dir($migrationPath)) {
                $this->loadMigrationsFrom($migrationPath);
            }
        }

        // Custom factory resolver for Mods
        Factory::guessFactoryNamesUsing(function (string $modelName) {
            // For models inside a "Mod"
            if (preg_match('/^App\\\\Mod\\\\([^\\\\]+)/', $modelName, $matches)) {
                $module = $matches[1];
                return "App\\Mod\\{$module}\\Database\\Factories\\" . class_basename($modelName) . 'Factory';
            }

            // Default Laravel factory name resolution
            $appNamespace = app()->getNamespace();

            $resolvedModelName = str_starts_with($modelName, $appNamespace . 'Models\\')
                ? substr($modelName, strlen($appNamespace . 'Models\\'))
                : substr($modelName, strlen($appNamespace));

            return 'Database\Factories\\' . $resolvedModelName . 'Factory';
        });
    }
}
