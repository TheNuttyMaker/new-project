import { Rule, SchematicContext, Tree, apply, url, template, mergeWith, MergeStrategy, forEach, FileEntry } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
  


export function newProject(_options: any): Rule {
  const name = _options.name;
  console.log(name);

  return (tree: Tree, _context: SchematicContext) => {

    const templateSource = apply(url('./files'), [
      template({ ..._options, ...strings }),
      forEach((fileEntry: FileEntry) => {
        if (tree.exists(fileEntry.path)) {
          tree.overwrite(fileEntry.path, fileEntry.content)
        }
        return fileEntry;
      }),
    ]);
    const rule = mergeWith(templateSource, MergeStrategy.Overwrite)

    return rule(tree, _context) as Rule;
  }
}

// export function newProject(_options: any): Rule {
//   const name = _options.name;
  
//   return (tree: Tree, _context: SchematicContext) => {
  
//     const templateSource = apply(url('./files'), [
//       template({..._options, ...strings}),
//     ]);
//     const merged = mergeWith(templateSource, MergeStrategy.Overwrite)
  
//     const rule = chain([
//       generateRepo(name),
//       merged
//     ]);
  
//     return rule(tree, _context) as Rule;
//   }
// }
  
// function generateRepo(name: string): Rule {
//  return externalSchematic('@schematics/angular', 'ng-new', {
//    name,
//    version: '9.0.0',
//    directory: name,
//    routing: false,
//    style: 'scss',
//    inlineStyle: false,
//    inlineTemplate: false
//  });
// }